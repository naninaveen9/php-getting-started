<?php defined('BASEPATH') or exit('No direct script access allowed');

$this->load->view('partials/_emoji_reaction_item', ['reactions' => $reactions, 'reaction' => 'like']);
$this->load->view('partials/_emoji_reaction_item', ['reactions' => $reactions, 'reaction' => 'dislike']);
$this->load->view('partials/_emoji_reaction_item', ['reactions' => $reactions, 'reaction' => 'love']);
$this->load->view('partials/_emoji_reaction_item', ['reactions' => $reactions, 'reaction' => 'funny']);
$this->load->view('partials/_emoji_reaction_item', ['reactions' => $reactions, 'reaction' => 'angry']);
$this->load->view('partials/_emoji_reaction_item', ['reactions' => $reactions, 'reaction' => 'sad']);
$this->load->view('partials/_emoji_reaction_item', ['reactions' => $reactions, 'reaction' => 'wow']);
?>