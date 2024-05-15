<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use Faker\Factory as Faker;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        foreach (range(1, 20) as $index) {
            Task::create([
                'title' => $faker->sentence,
                'description' => $faker->paragraph,
                'priority' => $faker->numberBetween(1, 3), // Assuming priority is between 1 and 3
                'status' => $faker->numberBetween(1, 3),
                'due_date' => $faker->dateTimeBetween('now', '+1 month'),
            ]);
        }
    }
}
