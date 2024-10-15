import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link , router} from '@inertiajs/react';
import { TASK_PRIORITY_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constant';
import TableHeadings from '@/Components/TableHeadings';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';
import Pagination from '@/Components/Pagination';
export default function Show({task, auth}) {
    task = task['data'];
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
                            <img className="object-cover w-full h-72" src={task.image_path} alt="Task Image" />
                        </div>
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
                            <div>
                                <div className="grid grid-cols-4 gap-1 mt-2">
                                    <div>
                                        <label className="text-lg font-bold">Task ID</label>
                                        <p className="my-1">{task.id}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">Task Status</label>
                                        <p className={"px-2 py-1 my-1 w-fit text-white rounded " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">Task Name</label>
                                        <p className="my-1">{task.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">Created By</label>
                                        <p className="my-1">{task.created_by.name}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-1 mt-2">
                                    <div>
                                        <label className="text-lg font-bold">Due Date</label>
                                        <p className="my-1">{task.due_date}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">Updated At</label>
                                        <p className="my-1">{task.updated_at}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">Updated By</label>
                                        <p className="my-1">{task.updated_by.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">Priority</label>
                                        <p className={"px-2 py-1 my-1 w-fit text-white rounded " + TASK_PRIORITY_CLASS_MAP[task.priority]}>{TASK_PRIORITY_TEXT_MAP[task.priority]}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">Assigned User</label>
                                        <p className="my-1">{task.assigned_user.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">Created At</label>
                                        <p className="my-1">{task.created_at}</p>
                                    </div>
                                    <div>
                                        <label className="text-lg font-bold">Project Name</label>
                                        <p className="my-1">
                                            <Link href={route('projects.show', task.project.id)}>{task.project.name}</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <label className="text-lg font-bold">Task Description</label>
                                <p className="my-1">{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
