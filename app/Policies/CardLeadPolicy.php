<?php

namespace App\Policies;

use App\Models\CardLead;
use App\Models\User;

class CardLeadPolicy
{
    public function view(User $user, CardLead $lead): bool
    {
        return $user->id === $lead->user_id;
    }

    public function update(User $user, CardLead $lead): bool
    {
        return $user->id === $lead->user_id;
    }

    public function delete(User $user, CardLead $lead): bool
    {
        return $user->id === $lead->user_id;
    }
}
