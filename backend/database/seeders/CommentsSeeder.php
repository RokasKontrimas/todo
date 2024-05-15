<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
use Faker\Factory as Faker;

class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Get existing user IDs
        $userIds = \App\Models\User::pluck('id')->toArray();

        foreach (range(1, 20) as $index) {
            Comment::create([
                'comment' => $faker->paragraph,
                'user_id' => $faker->randomElement($userIds),
                'task_id' => $faker->numberBetween(1, 20),
            ]);
        }
    }
}
