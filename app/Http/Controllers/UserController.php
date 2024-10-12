<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Inertia\Inertia;
use Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('email')) {
            $query->where('email', 'like', '%' . request('email') . '%');
        }

        $users = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return Inertia::render('User/Index', [
            'users' => UserResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),                
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user = $request->validated();
        $user['password'] = bcrypt($user['password']);
        User::create($user);

        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        $query = $user->assignedTasks();

        $sortField = request()->input('sort_field', 'created_at');
        $sortDirection = request()->input('sort_direction', 'desc');

        if (request()->has('name')) {
            $query->where('name', 'like', '%' . request()->input('name') . '%');
        }

        if (request()->has('status')) {
            if (request()->input('status') !== 'all') {
                $query->where('status', request()->input('status'));
            }
        }

        $assignedTasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return Inertia::render('User/Show', [
            'user' => new UserResource($user),
            'assigned_tasks' => TaskResource::collection($assignedTasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'user' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $data['password'] = $data['password'] ? bcrypt($data['password']) : $user->password;
        $user->update($data);
        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();
        return redirect()->route('users.index')->with('success', 'User "'.$name.'" deleted successfully');
    }
}
