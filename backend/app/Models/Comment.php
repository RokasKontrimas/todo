<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'task_id',
        'comment_text',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the task that the comment belongs to.
     */
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
