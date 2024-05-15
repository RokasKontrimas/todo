<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'priority',
        'status',
        'due_date',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function labels()
    {
        return $this->belongsToMany(Label::class, 'label_task');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
