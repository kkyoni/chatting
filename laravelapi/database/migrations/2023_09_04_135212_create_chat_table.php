<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat', function (Blueprint $table) {
            $table->id();
            $table->string('sent_from')->nullable();
            $table->string('sent_to')->nullable();
            $table->text('message')->nullable();
            $table->string('is_read')->nullable();
            $table->string('block_flage')->default(0)->nullable();
            $table->string('sent_from_delete')->default(0)->nullable();
            $table->string('sent_to_delete')->default(0)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chat');
    }
}
