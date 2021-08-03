<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class UserFactoryCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'factory:user {count}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate dummy data for user';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $count = $this->argument('count');

        User::factory()->count($count)->create();
        $this->info("$count dummy users have been successfully created!");
    }
}
