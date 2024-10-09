import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constant';
import TableHeadings from '@/Components/TableHeadings';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import Pagination from '@/Components/Pagination';
export default function Show({project, auth, queryParams, tasks}) {
    queryParams = queryParams || {};
    project = project['data'];
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`Project: ${project.name}`}
                </h2>
            }
        >
            <Head title={`Project: ${project.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div>
                            <img className="w-full h-72 object-cover" src={project.image_path} alt="Project Image" />
                        </div>
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
                            <div>
                                <div className="grid gap-1 grid-cols-2 mt-2">
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">Project ID</label>
                                            <p className="my-1">{project.id}</p>
                                        </div>
                                        <div>
                                            <label className="font-bold text-lg">Project Status</label>
                                            <p className={"px-2 py-1 my-1 w-fit text-white rounded " + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">Project Name</label>
                                            <p className="my-1">{project.name}</p>
                                        </div>
                                        <div>
                                            <label className="font-bold text-lg">Created By</label>
                                            <p className="my-1">{project.created_by.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-1 grid-cols-2 mt-2">
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">Due Date</label>
                                            <p className="my-1">{project.due_date}</p>
                                        </div>
                                        <div>
                                            <label className="font-bold text-lg">Created At</label>
                                            <p className="my-1">{project.created_at}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">Updated At</label>
                                            <p className="my-1">{project.updated_at}</p>
                                        </div>
                                        <div>
                                            <label className="font-bold text-lg">Updated By</label>
                                            <p className="my-1">{project.updated_by.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <label className="font-bold text-lg">Project Description</label>
                                <p className="my-1">{project.description}</p>
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
                                        <TableHeadings page="tasks" name="id" queryParams={queryParams} sortable={true}>ID</TableHeadings>
                                        <TableHeadings page="tasks">Image</TableHeadings>
                                        <TableHeadings page="tasks" name="name" queryParams={queryParams} sortable={true}>Name</TableHeadings>
                                        <TableHeadings page="tasks">Status</TableHeadings>
                                        <TableHeadings page="tasks" name="created_at" queryParams={queryParams} sortable={true}>Created At</TableHeadings>
                                        <TableHeadings page="tasks" name="due_date" queryParams={queryParams} sortable={true}>Due Date</TableHeadings>
                                        <TableHeadings page="tasks" name="created_by" queryParams={queryParams} sortable={true}>Created By</TableHeadings>
                                        <TableHeadings page="tasks">Action</TableHeadings>
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