<?php

namespace App\Notifications;

use App\Filament\Resources\Inquiries\InquiryResource;
use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewInquiryNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Inquiry $inquiry
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('New Website Inquiry: '.$this->inquiry->name)
            ->greeting('Hello Admin,')
            ->line('You have received a new inquiry from the website contact form.')
            ->line('**Name:** '.$this->inquiry->name)
            ->line('**Company:** '.($this->inquiry->company ?: 'N/A'))
            ->line('**Email:** '.$this->inquiry->email)
            ->line('**Phone:** '.($this->inquiry->phone ?: 'N/A'))
            ->line('**Country:** '.($this->inquiry->country ?: 'N/A'))
            ->line('**Segment:** '.($this->inquiry->segment ?: 'N/A'))
            ->line('**Message:**')
            ->line($this->inquiry->message)
            ->action('View Inquiry in Dashboard', InquiryResource::getUrl('index'))
            ->line('Thank you!');
    }

    public function toArray(object $notifiable): array
    {
        return [
            'inquiry_id' => $this->inquiry->id,
        ];
    }
}
