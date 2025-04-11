<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'is_completed' => fake()->boolean(),
            'due_date' => fake()->dateTimeBetween('now', '+1 month'),
            'created_at' => fake()->dateTimeBetween(now()->startOfWeek(), now()->endOfWeek()),
        ];
    }
}
