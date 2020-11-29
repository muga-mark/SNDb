import React from 'react';
import { useStateValue } from '../StateProvider';

import Card from './Card';
import PageFilter from './PageFilter';
import PaginationCustom from './PaginationCustom';
import SpinnerContentCustom from './SpinnerContentCustom';

import './PageContent.css';

function PageContent({ type, chartResult, loading, title, sortBy, setSortBy, setPage, menuItems, page }) {
    const [ { search },  dispatch] = useStateValue();

    return (
        <>
            {loading?
                <div className="page__spinner">
                    <SpinnerContentCustom 
                        loading={loading} 
                        size={20}
                        color={"#D1312D"}
                    />
                </div>
            :
                <>
                    <div className="page__content_header">
                        <div className="page__title">
                            <span>{title}</span>
                        </div>
                        {sortBy?
                            <div className="page__filter">
                                <PageFilter
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                    setPage={setPage}
                                    menuItems={menuItems}
                                />
                            </div>
                        :null}
                    </div>
                    
                    <div className="page__content_container">
                        <div className="page__content">
                            {chartResult.results.length>0 && chartResult.results.map((result)=> (
                                <div key={result.id} className="movie_content">
                                    {type?
                                        <Card key={result.id} {...result} type={type} />
                                    :
                                        <Card key={result.id} {...result} />
                                    }
                                </div>
                            ))}
                            {chartResult.results.length===0 && search? 
                                <div>
                                    No Search Found
                                </div>
                            :null}
                        </div>

                        <div className="page__content page__content_pagination">
                            {chartResult.results.length>0?
                                <PaginationCustom 
                                    totalPages={chartResult.total_pages}
                                    setPage={setPage}
                                    page={page}
                                />
                            :null}
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default PageContent
