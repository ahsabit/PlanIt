import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ user}) {
    user = user['data'];
    const { data, setData, post, reset, errors } = useForm({
        name: user.name ||'',
        email: user.email ||'',
        current_password: '',
        password: '',
        password_confirmation: '',
        _method: 'PUT',
    });

    const onSubmit = (e, id) => {
        e.preventDefault();
        post(route('users.update', id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {`Edit User: ${user.name}`}
                </h2>
            }
        >
            <Head title={`Edit User: ${user.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 overflow-auto text-gray-900 dark:text-gray-100">
                            <form onSubmit={(e) => onSubmit(e, user.id)}>
                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Name" />

                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        isFocused={true}
                                        required
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />

                                    <TextInput
                                        id="email"
                                        type="text"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="current_password" value="Current Password" />

                                    <TextInput
                                        id="current_password"
                                        type="text"
                                        name="current_password"
                                        value={data.current_password}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('current_password', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.current_password} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="New Password" />

                                    <TextInput
                                        id="password"
                                        type="text"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="confirm_password" value="Confirm Password" />

                                    <TextInput
                                        id="confirm_password"
                                        type="text"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        required
                                    />

                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>
                                <div className="flex justify-end">
                                    <TextInput type="submit" value="Update" className="mt-4 py-2 px-4 mr-1 !bg-green-800" />
                                    <TextInput type="button" onClick={() => reset()} value="Reset" className="mt-4 py-2 px-4 ml-1 !bg-red-800" />
                                    <Link href={route("users.index")} className="mt-4 py-2 px-4 ml-1 bg-blue-800 rounded-md">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}