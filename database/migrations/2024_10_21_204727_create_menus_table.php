<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenusTable extends Migration
{
    public function up()
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID
            $table->string('name'); // Menu name
            $table->unsignedBigInteger('parent_id')->nullable(); // Parent ID, nullable
            $table->unsignedInteger('depth')->nullable(); // Depth, nullable
            $table->timestamps(); // Created_at and updated_at
        });

        // Optionally, you can add a foreign key constraint if you want parent_id to reference the same table
        Schema::table('menus', function (Blueprint $table) {
            $table->foreign('parent_id')->references('id')->on('menus')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('menus');
    }
}
