<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function cProjects()
    {
        return $this->hasMany(Project::class, 'created_by');
    }

    public function uProjects()
    {
        return $this->hasMany(Project::class, 'updated_by');
    }

    public function cTasks()
    {
        return $this->hasMany(Task::class, 'created_by');
    }

    public function uTasks()
    {
        return $this->hasMany(Task::class, 'updated_by');
    }

    public function assignedTasks()
    {
        return $this->hasMany(Task::class, 'assigned_user_id');
    }
}
