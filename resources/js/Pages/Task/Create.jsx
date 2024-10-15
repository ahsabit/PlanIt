import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ project_id }) {
    project_id = project_id ?? '';
    const { data, setData, post, reset, errors } = useForm({
        'name': '',
        'description': '',
        'due_date': '',
        'status': '',
        'image': '',
        'priority' : '',
        'assigned_user_id': '',
        'project_id': project_id,
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('tasks.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create Task
                </h2>
            }
        >
            <Head title="Create Task" />


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="mt-4">
                                    <InputLabel htmlFor="image" value="Image" />

                                    <TextInput
                                        id="image"
                                        type="file"
                                        name="image"
                                        className="block w-full mt-1"
                                        onChange={(e) => setData('image', e.target.files[0])}
                                        required
                                    />

                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="block w-full mt-1"
                                        onChange={(e) => setData('name', e.target.value)}
                                        isFocused={true}
                                        required
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="status" value="Status" />

                                    <SelectInput name="status" value={data.status} onChange={(e) => setData('status', e.target.value)} required>
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="priority" value="Priority" />

                                    <SelectInput name="priority" value={data.priority} onChange={(e) => setData('priority', e.target.value)} required>
                                        <option value="">Select Status</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError message={errors.status} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="due_date" value="Task Deadline" />

                                    <TextInput
                                        id="due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        className="block w-full mt-1"
                                        onChange={(e) => setData('due_date', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="assigned_user_id" value="Assigned User ID" />

                                    <TextInput
                                        id="assigned_user_id"
                                        type="number"
                                        name="assigned_user_id"
                                        value={data.assigned_user_id}
                                        className="block w-full mt-1"
                                        onChange={(e) => setData('assigned_user_id', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.assigned_user_id} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Description" />

                                    <TextAreaInput className="block w-full mt-1" id="description" name="description" value={data.description} onChange={(e) => setData('description', e.target.value)} required></TextAreaInput>

                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                                <div className="flex justify-end">
                                    <TextInput type="submit" value="Create" className="mt-4 py-2 px-4 mr-1 !bg-green-800" />
                                    <TextInput type="button" onClick={() => reset()} value="Reset" className="mt-4 py-2 px-4 ml-1 !bg-red-800" />
                                    <Link href={route("tasks.index")} className="px-4 py-2 mt-4 ml-1 bg-blue-800 rounded-md">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
