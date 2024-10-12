import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import TableHeadings from '@/Components/TableHeadings';

export default function Index({ auth, users, queryParams, success}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route('users.index', queryParams));
    };

    const onKeyPress = (name, event) => {
        if(event.key === 'Enter'){
            searchFieldChanged(name, event.target.value);
        }
    }

    const deleteUser = (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('users.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Users
                    </h2>
                    <Link className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600" href={route('users.create')}>
                        Add New
                    </Link>
                </div>
            }
        >

            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        {success && <div className="bg-green-700 text-white px-6 py-4">{success}</div>}
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="border-gray-500 border-b-2 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <TableHeadings page="users" name="id" queryParams={queryParams} sortable={true}>ID</TableHeadings>
                                        <TableHeadings page="users" name="name" queryParams={queryParams} sortable={true}>Name</TableHeadings>
                                        <TableHeadings page="users" name="email" queryParams={queryParams} sortable={true}>Email</TableHeadings>
                                        <TableHeadings page="users" name="created_at" queryParams={queryParams} sortable={true}>Created At</TableHeadings>
                                        <TableHeadings page="users">Action</TableHeadings>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3">
                                            <TextInput defaultValue={queryParams.name} placeholder="Search by name" className="text-xs w-full" onBlur={(e) => searchFieldChanged('name', e.target.value)} onKeyPress={(e) => onKeyPress('name', e)}/>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            <TextInput defaultValue={queryParams.email} placeholder="Search by email" className="text-xs w-full" onBlur={(e) => searchFieldChanged('email', e.target.value)} onKeyPress={(e) => onKeyPress('email', e)}/>
                                        </th>
                                        <th scope="col" className="px-6 py-3"></th>
                                        <th scope="col" className="px-6 py-3"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => {
                                        return (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id}>
                                                <th className="px-6 py-3">{user.id}</th>
                                                <td className="px-6 py-3">{user.name}</td>
                                                <td className="px-6 py-3">
                                                    <Link className="text-white hover:underline" href={route('users.show', user.id)}>{user.email}</Link>
                                                </td>
                                                <td className="px-6 py-3 text-nowrap">{user.created_at}</td>
                                                <td className="px-6 py-3">
                                                    <Link href={route('users.edit', user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</Link>
                                                    <button onClick={() => deleteUser(user.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mr-2">Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <Pagination links={users.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}