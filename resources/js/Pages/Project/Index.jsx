import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constant';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import TableHeadings from '@/Components/TableHeadings';

export default function Index({ auth, projects, queryParams, success}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route('projects.index', queryParams));
    };

    const onKeyPress = (name, event) => {
        if(event.key === 'Enter'){
            searchFieldChanged(name, event.target.value);
        }
    }

    const deleteProject = (id) => {
        if (confirm('Are you sure you want to delete this project?')) {
            router.delete(route('projects.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Projects
                    </h2>
                    <Link className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600" href={route('projects.create')}>
                        Add New
                    </Link>
                </div>
            }
        >

            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        {success && <div className="bg-green-700 text-white px-6 py-4">{success}</div>}
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="border-gray-500 border-b-2 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <TableHeadings page="projects" name="id" queryParams={queryParams} sortable={true}>ID</TableHeadings>
                                        <TableHeadings page="projects">Image</TableHeadings>
                                        <TableHeadings page="projects" name="name" queryParams={queryParams} sortable={true}>Name</TableHeadings>
                                        <TableHeadings page="projects">Status</TableHeadings>
                                        <TableHeadings page="projects" name="created_at" queryParams={queryParams} sortable={true}>Created At</TableHeadings>
                                        <TableHeadings page="projects" name="due_date" queryParams={queryParams} sortable={true}>Due Date</TableHeadings>
                                        <TableHeadings page="projects" name="created_by" queryParams={queryParams} sortable={true}>Created By</TableHeadings>
                                        <TableHeadings page="projects">Action</TableHeadings>
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
                                    {projects.data.map((project) => {
                                        return (
                                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                                                <th className="px-6 py-3">{project.id}</th>
                                                <td className="px-6 py-3"><img src={project.image_path} className="w-10 h-10" /></td>
                                                <td className="px-6 py-3">
                                                    <Link className="text-white hover:underline" href={route('projects.show', project.id)}>{project.name}</Link>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <span className={"px-2 py-1 text-white rounded " + PROJECT_STATUS_CLASS_MAP[project.status]}>{PROJECT_STATUS_TEXT_MAP[project.status]}</span>
                                                </td>
                                                <td className="px-6 py-3 text-nowrap">{project.created_at}</td>
                                                <td className="px-6 py-3 text-nowrap">{project.due_date}</td>
                                                <td className="px-6 py-3">{project.created_by.name}</td>
                                                <td className="px-6 py-3">
                                                    <Link href={route('projects.edit', project.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">Edit</Link>
                                                    <button onClick={() => deleteProject(project.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline mr-2">Delete</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}