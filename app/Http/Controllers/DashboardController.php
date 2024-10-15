<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(){
        $user = Auth::user();

        $totalTaskCount = Task::query()->count();
        $totalProjectCount = Project::query()->count();
        $totalPendingTaskCount = Task::query()->where('status', 'pending')->count();
        $totalPendingProjectCount = Project::query()->where('status', 'pending')->count();
        $totalProgressiveTaskCount = Task::query()->where('status', 'in_progress')->count();
        $totalProgressiveProjectCount = Project::query()->where('status', 'in_progress')->count();
        $totalCompletedTaskCount = Task::query()->where('status', 'completed')->count();
        $totalCompletedProjectCount = Project::query()->where('status', 'completed')->count();

        $myTaskCount = Task::query()->where('assigned_user_id', $user->id)->count();
        $myProjectCount = Project::query()->where('created_by', $user->id)->count();
        $myPendingTaskCount = Task::query()->where('status', 'pending')->where('assigned_user_id', $user->id)->count();
        $myPendingProjectCount = Project::query()->where('status', 'pending')->where('created_by', $user->id)->count();
        $myProgressiveTaskCount = Task::query()->where('status', 'in_progress')->where('assigned_user_id', $user->id)->count();
        $myProgressiveProjectCount = Project::query()->where('status', 'in_progress')->where('created_by', $user->id)->count();
        $myCompletedTaskCount = Task::query()->where('status', 'completed')->where('assigned_user_id', $user->id)->count();
        $myCompletedProjectCount = Project::query()->where('status', 'completed')->where('created_by', $user->id)->count();

        $myTasks = Task::query()->where('assigned_user_id', $user->id)->paginate(10)->onEachSide(1);

        $myTasks = TaskResource::collection($myTasks);
        $queryParams = request()->query() ?? null;

        return Inertia::render('Dashboard',
            compact(
                'totalTaskCount',
                'totalProjectCount',
                'totalPendingTaskCount',
                'totalPendingProjectCount',
                'totalProgressiveTaskCount',
                'totalProgressiveProjectCount',
                'totalCompletedTaskCount',
                'totalCompletedProjectCount',
                'myPendingTaskCount',
                'myPendingProjectCount',
                'myProgressiveTaskCount',
                'myProgressiveProjectCount',
                'myCompletedTaskCount',
                'myCompletedProjectCount',
                'myTasks',
                'myTaskCount',
                'myProjectCount',
                'queryParams'
            ));
    }
}
