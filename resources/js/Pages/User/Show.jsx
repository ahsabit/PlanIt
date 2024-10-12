import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TasksTable from '@/Components/TasksTable';
export default function Show({user, auth, queryParams, assigned_tasks}) {
    queryParams = queryParams || {};
    user = user['data'];
    queryParams['user'] = user.id;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`User: ${user.name}`}
                </h2>
            }
        >
            <Head title={`User: ${user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
                            <div>
                                <div className="grid gap-1 grid-cols-2 mt-2">
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">User ID</label>
                                            <p className="my-1">{user.id}</p>
                                        </div>
                                        <div>
                                            <label className="font-bold text-lg">Name</label>
                                            <p className="my-1">{user.name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">Email</label>
                                            <p className="my-1">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid gap-1 grid-cols-2 mt-2">
                                    <div>
                                        <div>
                                            <label className="font-bold text-lg">Created At</label>
                                            <p className="my-1">{user.created_at}</p>
                                        </div>
                                        {user.updated_at && (
                                            <div>
                                                <label className="font-bold text-lg">Updated At</label>
                                                <p className="my-1">{user.updated_at}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TasksTable queryParams={queryParams} assigned_tasks={assigned_tasks} user={user}/>
        </AuthenticatedLayout>
    );
}