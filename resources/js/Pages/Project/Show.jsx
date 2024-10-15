import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link , router} from '@inertiajs/react';
import { TASK_PRIORITY_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constant';
import TableHeadings from '@/Components/TableHeadings';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import Pagination from '@/Components/Pagination';
export default function Show({project, auth, queryParams, tasks, success}) {
    queryParams = queryParams || {};
    project = project['data'];
    queryParams['project'] = project.id;

    const searchFieldChanged = (name, value) => {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route('projects.show', queryParams));
    };

    const onKeyPress = (name, event) => {
        if(event.key === 'Enter'){
            searchFieldChanged(name, event.target.value);
        }
    }

    const deleteTask = (id) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('tasks.destroy', id) + '?project_id=' + project.id);
        }
    };
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
                        {success && <div className="px-6 py-4 text-white bg-green-700">{success}</div>}
                        <div>
                            <img className="object-cover w-full h-72" src={project.image_path} alt="Project Image" />
                        </div>
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
                            <div>
                                <div className="grid grid-cols-2 gap-1 mt-2">
                                    <div>
                                        <div>
                                            <label className="text-lg font-bold">Project ID</label>
                                            <p className="my-1">{project.id}</p>
                                        </div>
                                        <div>
                                            <label className="text-lg font-bold">Project Status</label>
                                            <p className={"px-2 py-1 my-1 w-fit text-white rounded " + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="text-lg font-bold">Project Name</label>
                                            <p className="my-1">{project.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-lg font-bold">Created By</label>
                                            <p className="my-1">{project.created_by.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-1 mt-2">
                                    <div>
                                        <div>
                                            <label className="text-lg font-bold">Due Date</label>
                                            <p className="my-1">{project.due_date}</p>
                                        </div>
                                        <div>
                                            <label className="text-lg font-bold">Created At</label>
                                            <p className="my-1">{project.created_at}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="text-lg font-bold">Updated At</label>
                                            <p className="my-1">{project.updated_at}</p>
                                        </div>
                                        <div>
                                            <label className="text-lg font-bold">Updated By</label>
                                            <p className="my-1">{project.updated_by.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <label className="text-lg font-bold">Project Description</label>
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
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <TableHeadings page="projects" uri={'show'} name="id" queryParams={queryParams} sortable={true}>ID</TableHeadings>
                                        <TableHeadings page="projects" uri={'show'}>Image</TableHeadings>
                                        <TableHeadings page="projects" uri={'show'} name="name" queryParams={queryParams} sortable={true}>Name</TableHeadings>
                                        <TableHeadings page="projects" uri={'show'}>Status</TableHeadings>
                                        <TableHeadings page="projects" uri={'show'} name="created_at" queryParams={queryParams} sortable={true}>Priority</TableHeadings>
                                        <TableHeadings page="projects" uri={'show'} name="created_at" queryParams={queryParams} sortable={true}>Created At</TableHeadings>
                                        <TableHeadings page="projects" uri={'show'} name="due_date" queryParams={queryParams} sortable={true}>Due Date</TableHeadings>
                                        <TableHeadings page="projects" uri={'show'} name="created_by" queryParams={queryParams} sortable={true}>Created By</TableHeadings>
                                        <TableHeadings page="projects" uri={'show'} name="created_by" queryParams={queryParams} sortable={true}>Assigned User</TableHeadings>
                                        <TableHeadings page="projects" uri={'show'}>Action</TableHeadings>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3">
                                            <TextInput defaultValue={queryParams.name} placeholder="Search by name" className="w-full text-xs" onBlur={(e) => searchFieldChanged('name', e.target.value)} onKeyPress={(e) => onKeyPress('name', e)}/>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <SelectInput defaultValue={queryParams.status} className="w-full text-xs" onChange={(e) => searchFieldChanged('status', e.target.value)}>
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
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3">
                                            <Link href={route('tasks.create') + '?project=' + project.id} className="mr-2 font-medium text-green-600 capitalize dark:text-green-500 hover:underline">Add Task</Link>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.data.map((task) => {
                                        return (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={task.id}>
                                                <th className="px-6 py-3">{task.id}</th>
                                                <td className="px-6 py-3"><img src={task.image_path} className="w-10 h-10" /></td>
                                                <td className="px-6 py-3">
                                                    <Link className="text-white hover:underline" href={route('tasks.show', task.id)}>{task.name}</Link>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <span className={"px-2 py-1 text-white rounded " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}</span>
                                                </td>
                                                <td className="px-6 py-3 text-nowrap"><p className={"px-2 py-1 my-1 w-fit text-white rounded " + TASK_PRIORITY_CLASS_MAP[task.priority]}>{TASK_PRIORITY_TEXT_MAP[task.priority]}</p></td>
                                                <td className="px-6 py-3 text-nowrap">{task.created_at}</td>
                                                <td className="px-6 py-3 text-nowrap">{task.due_date}</td>
                                                <td className="px-6 py-3">{task.created_by.name}</td>
                                                <td className="px-6 py-3">{task.assigned_user.name}</td>
                                                <td className="px-6 py-3">
                                                    <Link href={route('tasks.edit', task.id) + '?project_id=' + project.id} className="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                                    <button onClick={() => deleteTask(task.id)} className="mr-2 font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
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
