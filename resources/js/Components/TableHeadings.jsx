import { ChevronUpIcon, ChevronDownIcon} from '@heroicons/react/16/solid';
import { router } from '@inertiajs/react';

export default function TableSortLink({ name=null, children, queryParams=null, sortable=false }) {
    const sortChange = (field) => {
        if (queryParams.sort_field === field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            }else{
                queryParams.sort_direction = 'asc';
            }
        }else{
            queryParams.sort_field = field;
            queryParams.sort_direction = 'asc';
        }
    
        router.get(route('projects.index', queryParams));
    }

    return (
        <th  onClick={() => sortChange(name)} scope="col" className="table-cell cursor-pointer px-6 py-3">
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