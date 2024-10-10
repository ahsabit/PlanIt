<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use App\Models\Project;
use App\Models\Task;
use Inertia\Inertia;
use Storage;
use Str;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
        public function index()
        {
            $query = Project::query();

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

            $projects = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

            return Inertia::render('Project/Index', [
                'projects' => ProjectResource::collection($projects),
                'queryParams' => request()->query() ?: null,
                'success' => session('success'),                
            ]);
        }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Project/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();
        if($image){
            $data['image_path'] = $image->store('projects/'.Str::random(16), 'public');
        }else{
            $data['image_path'] = null;
        }
        Project::create($data);
        
        return redirect()->route('projects.index')->with('success', 'Project created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();

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

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return Inertia::render('Project/Show', [
            'project' => new ProjectResource($project),
            'tasks' => TaskResource::collection($tasks),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('Project/Edit', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        dd($request);
        // Validate and retrieve the validated data from the request
        $data = $request->validated();

        // Get the image from the validated data or set it to null
        $image = $data['image'] ?? null;
        
        // Set the ID of the user making the update
        $data['updated_by'] = Auth::id();

        // If an image is provided, store it and set the path
        if ($image) {
            // Store the image in a unique subdirectory and get the path
            $data['image_path'] = $image->store('projects/' . Str::random(16), 'public');
        } else {
            // If no new image is uploaded, retain the old image path
            $data['image_path'] = $project->image_path;
        }

        // Update the project with the validated data
        $project->update($data);

        // Redirect back with a success message
        return redirect()->route('projects.index')->with('success', 'Project updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        if (Storage::disk('public')->exists($project->image_path)) {
            Storage::disk('public')->delete($project->image_path);
        }
        $project->delete();
        return redirect()->route('projects.index')->with('success', 'Project "'.$name.'" deleted successfully');
    }
}
