<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Models\Task;
use Inertia\Inertia;
use Storage;
use Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::with(['project', 'createdBy', 'updatedBy', 'assignedUser']);

        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request('status')) {
            if(request('status') !== 'all') {
                $query->where('status', request('status'));
            }
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return Inertia::render('Task/Index', [
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
            'success' => session('success') ?: null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projectId = request('project') ?: null;
        return Inertia::render('Task/Create', [
            'project_id' => $projectId
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?: null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if($image){
            $data['image_path'] = $image->store('tasks/'.Str::random(16), 'public');
        }else{
            $data['image_path'] = null;
        }
        unset($data['image']);
        Task::create($data);

        return redirect()->route('projects.show', $data['project_id'])->with('success', 'Task created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //not required
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        if (request('project_id')) {
            $isProject = request('project_id') == $task->project_id ? TRUE : FALSE;
        }else{
            $isProject = FALSE;
        }
        return Inertia::render('Task/Edit', [
            'task' => new TaskResource($task),
            'is_project' => $isProject
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $isProject = $data['is_project'];
        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();

        if ($image) {
            if (Storage::disk('public')->exists($task->image_path)) {
                $dirName = dirname($task->image_path);
                Storage::disk('public')->delete($task->image_path);
                if ($dirName) {
                    Storage::disk('public')->deleteDirectory($dirName);
                }
            }
            $data['image_path'] = $image->store('tasks/' . Str::random(16), 'public');
        } else {
            $data['image_path'] = $task->image_path;
        }
        $task->update($data);

        if ($isProject == TRUE) {
            return redirect()->route('projects.show', $data['project_id'])->with('success', 'Task updated successfully');
        }else{
            return redirect()->route('tasks.index')->with('success', 'Task updated successfully');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        $projectId = $task->project_id;
        if($task->image_path){
            if (Storage::disk('public')->exists($task->image_path)) {
                $dirName = dirname($task->image_path);
                Storage::disk('public')->delete($task->image_path);
                if ($dirName) {
                    Storage::disk('public')->deleteDirectory($dirName);
                }
            }
        }
        $task->delete();

        if (request('project_id')) {
            if (request('project_id') == $projectId) {
                return redirect()->route('projects.show', $projectId)->with('success', 'Task "'.$name.'" deleted successfully');
            }else{
                return redirect()->route('tasks.index')->with('success', 'Task "'.$name.'" deleted successfully');
            }
        }else{
            return redirect()->route('tasks.index')->with('success', 'Task "'.$name.'" deleted successfully');
        }
    }
}
