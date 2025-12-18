<?php

namespace App\Mail;

use App\Models\BusinessCard;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ShareBusinessCard extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public BusinessCard $card,
        public User $sender,
        public ?string $personalMessage = null
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "{$this->sender->name} shared their business card with you",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.share-business-card',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
