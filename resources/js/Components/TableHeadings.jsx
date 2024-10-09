import { ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/16/solid';
import { router } from '@inertiajs/react';

export default function TableSortLink({ page, name=null, children, queryParams=null, sortable=false }) {
    const sortChange = (field) => {
        const params = queryParams || {};
        if(!field || !params || params == {}){return;}
        if (params.sort_field === field) {
            if (params.sort_direction === 'asc') {
                params.sort_direction = 'desc';
            }else{
                params.sort_direction = 'asc';
            }
        }else{
            params.sort_field = field;
            params.sort_direction = 'asc';
        }

        const realPage = page + '.index';
    
        router.get(route(realPage, params));
    }

    return (
        <th onClick={sortable ? () => sortChange(name) : () => sortChange(null) } scope="col" className="table-cell cursor-pointer px-6 py-3">
            <div className="flex items-center justify-between gap-1">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon className={"w-4 -mb-2 " + (queryParams.sort_field === name && queryParams.sort_direction === "asc" ? "text-white" : "")} />
                        <ChevronDownIcon className={"w-4 -mt-2 " + (queryParams.sort_field === name && queryParams.sort_direction === "desc" ? "text-white" : "")} />
                    </div>
                )}
            </div>
        </th>
    );
}