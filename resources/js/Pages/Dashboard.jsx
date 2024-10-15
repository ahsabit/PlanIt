import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP, TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP } from '@/constant';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';

export default function Dashboard(
    {
        totalTaskCount,
        totalProjectCount,
        totalPendingTaskCount,
        totalPendingProjectCount,
        totalProgressiveTaskCount,
        totalProgressiveProjectCount,
        totalCompletedTaskCount,
        totalCompletedProjectCount,
        myPendingTaskCount,
        myPendingProjectCount,
        myProgressiveTaskCount,
        myProgressiveProjectCount,
        myCompletedTaskCount,
        myCompletedProjectCount,
        myTasks,
        myTaskCount,
        myProjectCount,
        queryParams
    }) {
    queryParams = queryParams ?? {};

    const deleteTask = (id) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(route('tasks.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className='mx-auto max-w-7xl'>
                <h1 className='p-2 mt-4 text-lg font-bold text-gray-900 dark:text-gray-100'>Projects</h1>
                <div className='flex'>
                    <div className="w-1/3 m-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-4 text-gray-900 dark:text-gray-100">
                                <h2 className='font-semibold text-amber-500'>Pending</h2>
                                <span>{totalPendingProjectCount}/{totalProjectCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 m-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-4 text-gray-900 dark:text-gray-100">
                                <h2 className='font-semibold text-blue-500'>In Progress</h2>
                                <span>{totalProgressiveProjectCount}/{totalProjectCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 m-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-4 text-gray-900 dark:text-gray-100">
                                <h2 className='font-semibold text-green-500'>Completed</h2>
                                <span>{totalCompletedProjectCount}/{totalProjectCount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className='p-2 text-lg font-bold text-gray-900 dark:text-gray-100'>Tasks</h1>
                <div className='flex'>
                    <div className="w-1/3 m-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-4 text-gray-900 dark:text-gray-100">
                                <h2 className='font-semibold text-amber-500'>Pending</h2>
                                <span>{totalPendingTaskCount}/{totalTaskCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 m-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-4 text-gray-900 dark:text-gray-100">
                                <h2 className='font-semibold text-blue-500'>In Progress</h2>
                                <span>{totalProgressiveTaskCount}/{totalTaskCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 m-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-4 text-gray-900 dark:text-gray-100">
                                <h2 className='font-semibold text-green-500'>Completed</h2>
                                <span>{totalCompletedTaskCount}/{totalTaskCount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className='p-2 mt-4 text-lg font-bold text-gray-900 dark:text-gray-100'>My Projects</h1>
                <div className='flex'>
                    <div className="w-1/3 m-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-4 text-gray-900 dark:text-gray-100">
                                <h2 className='font-semibold text-amber-500'>Pending</h2>
                                <span>{myPendingProjectCount}/{myProjectCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 m-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-4 text-gray-900 dark:text-gray-100">
                                <h2 className='font-semibold text-blue-500'>In Progress</h2>
                                <span>{myProgressiveProjectCount}/{myProjectCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 m-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-4 text-gray-900 dark:text-gray-100">
                                <h2 className='font-semibold text-green-500'>Completed</h2>
                                <span>{myCompletedProjectCount}/{myProjectCount}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h1 className='p-2 text-lg font-bold text-gray-900 dark:text-gray-100'>My Tasks</h1>
                <div className='flex'>
                    <div className="w-1/3 m-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-4 text-gray-900 dark:text-gray-100">
                                <h2 className='font-semibold text-amber-500'>Pending</h2>
                                <span>{myPendingTaskCount}/{myTaskCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 m-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-4 text-gray-900 dark:text-gray-100">
                                <h2 className='font-semibold text-blue-500'>In Progress</h2>
                                <span>{myProgressiveTaskCount}/{myTaskCount}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 m-2">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-4 text-gray-900 dark:text-gray-100">
                                <h2 className='font-semibold text-green-500'>Completed</h2>
                                <span>{myCompletedTaskCount}/{myTaskCount}</span>
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
                                        <th className='px-6 py-3' page="dashboard" uri={'index'} name="id" queryParams={queryParams} sortable={true}>ID</th>
                                        <th className='px-6 py-3' page="dashboard" uri={'index'}>Image</th>
                                        <th className='px-6 py-3' page="dashboard" uri={'index'} name="name" queryParams={queryParams} sortable={true}>Name</th>
                                        <th className='px-6 py-3' page="dashboard" uri={'index'}>Status</th>
                                        <th className='px-6 py-3' page="dashboard" uri={'index'} name="created_at" queryParams={queryParams} sortable={true}>Priority</th>
                                        <th className='px-6 py-3' page="dashboard" uri={'index'} name="created_at" queryParams={queryParams} sortable={true}>Created At</th>
                                        <th className='px-6 py-3' page="dashboard" uri={'index'} name="due_date" queryParams={queryParams} sortable={true}>Due Date</th>
                                        <th className='px-6 py-3' page="dashboard" uri={'index'} name="created_by" queryParams={queryParams} sortable={true}>Created By</th>
                                        <th className='px-6 py-3' page="dashboard" uri={'index'} name="created_by" queryParams={queryParams} sortable={true}>Assigned User</th>
                                        <th className='px-6 py-3' page="dashboard" uri={'index'}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {myTasks.data.map((task) => {
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
                                                    <Link href={route('tasks.edit', task.id)} className="mr-2 font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                                    <button onClick={() => deleteTask(task.id)} className="mr-2 font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <Pagination links={myTasks.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
