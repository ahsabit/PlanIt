import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link , router} from '@inertiajs/react';
import { TASK_PRIORITY_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constant';
import TableHeadings from '@/Components/TableHeadings';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import Pagination from '@/Components/Pagination';
export default function Show({task, auth, queryParams, tasks}) {
    queryParams = queryParams || {};
    task = task['data'];
    queryParams['task'] = task.id;

    const searchFieldChanged = (name, value) => {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route('tasks.show', queryParams));
    };

    const onKeyPress = (name, event) => {
        if(event.key === 'Enter'){
            searchFieldChanged(name, event.target.value);
        }
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`Task: ${task.name}`}
                </h2>
            }
        >
            <Head title={`Task: ${task.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div>
                            <img className="w-full h-72 object-cover" src={task.image_path} alt="Task Image" />
                        </div>
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
                            <div>
                                <div className="grid gap-1 grid-cols-2 mt-2">
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">Task ID</label>
                                            <p className="my-1">{task.id}</p>
                                        </div>
                                        <div>
                                            <label className="font-bold text-lg">Task Status</label>
                                            <p className={"px-2 py-1 my-1 w-fit text-white rounded " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">Task Name</label>
                                            <p className="my-1">{task.name}</p>
                                        </div>
                                        <div>
                                            <label className="font-bold text-lg">Created By</label>
                                            <p className="my-1">{task.created_by.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-1 grid-cols-2 mt-2">
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">Due Date</label>
                                            <p className="my-1">{task.due_date}</p>
                                        </div>
                                        <div>
                                            <label className="font-bold text-lg">Created At</label>
                                            <p className="my-1">{task.created_at}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">Updated At</label>
                                            <p className="my-1">{task.updated_at}</p>
                                        </div>
                                        <div>
                                            <label className="font-bold text-lg">Updated By</label>
                                            <p className="my-1">{task.updated_by.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <label className="font-bold text-lg">Task Description</label>
                                <p className="my-1">{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="border-gray-500 border-b-2 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <TableHeadings page="tasks" uri={'show'} name="id" queryParams={queryParams} sortable={true}>ID</TableHeadings>
                                        <TableHeadings page="tasks" uri={'show'}>Image</TableHeadings>
                                        <TableHeadings page="tasks" uri={'show'} name="name" queryParams={queryParams} sortable={true}>Name</TableHeadings>
                                        <TableHeadings page="tasks" uri={'show'}>Status</TableHeadings>
                                        <TableHeadings page="tasks" uri={'show'} name="created_at" queryParams={queryParams} sortable={true}>Priority</TableHeadings>
                                        <TableHeadings page="tasks" uri={'show'} name="created_at" queryParams={queryParams} sortable={true}>Created At</TableHeadings>
                                        <TableHeadings page="tasks" uri={'show'} name="due_date" queryParams={queryParams} sortable={true}>Due Date</TableHeadings>
                                        <TableHeadings page="tasks" uri={'show'} name="created_by" queryParams={queryParams} sortable={true}>Created By</TableHeadings>
                                        <TableHeadings page="tasks" uri={'show'}>Action</TableHeadings>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3">
                                            <TextInput defaultValue={queryParams.name} placeholder="Search by name" className="text-xs w-full" onBlur={(e) => searchFieldChanged('name', e.target.value)} onKeyPress={(e) => onKeyPress('name', e)}/>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <SelectInput defaultValue={queryParams.status} className="text-xs w-full" onChange={(e) => searchFieldChanged('status', e.target.value)}>
                                                <option value="">Select Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </SelectInput>
                                        </th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3">
                                            <Link href={route('tasks.create', task.id)} className="font-medium text-green-600 dark:text-green-500 hover:underline mr-2 capitalize">Add Task</Link>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task) => {
                                        return (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                                                <th className="px-6 py-3">{task.id}</th>
                                                <td className="px-6 py-3"><img src={task.image} className="w-10 h-10" /></td>
                                                <td className="px-6 py-3">{task.name}</td>
                                                <td className="px-6 py-3">
                                                    <span className={"px-2 py-1 text-white rounded " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}</span>
                                                </td>
                                                <td className="px-6 py-3 text-nowrap"><p className={"px-2 py-1 my-1 w-fit text-white rounded " + TASK_PRIORITY_CLASS_MAP[task.priority]}>{TASK_PRIORITY_TEXT_MAP[task.priority]}</p></td>
                                                <td className="px-6 py-3 text-nowrap">{task.created_at}</td>
                                                <td className="px-6 py-3 text-nowrap">{task.due_date}</td>
                                                <td className="px-6 py-3">{task.created_by.name}</td>
                                                <td className="px-6 py-3">
                                                    <Link href={route('tasks.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</Link>
                                                    <Link href={route('tasks.destroy', task.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mr-2">Delete</Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <Pagination links={tasks.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}