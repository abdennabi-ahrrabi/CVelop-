<?php

namespace App\Mail;

use App\Models\BusinessCard;
use App\Models\CardLead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewLeadNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public CardLead $lead,
        public BusinessCard $card
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New inquiry from {$this->lead->name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.new-lead',
        );
    }
}
