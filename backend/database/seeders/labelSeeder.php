<?php

namespace Database\Seeders;

use App\Models\Label;
use Illuminate\Database\Seeder;

class labelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $labels = ['Urgent', 'Important', 'Home', 'Work', 'Personal'];
        foreach ($labels as $label) {
            Label::create([
                'name' => $label
            ]);
        }

    }
}
