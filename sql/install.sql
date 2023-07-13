CREATE TABLE IF NOT EXISTS `servers` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` varchar(64) NOT NULL,
    `token` varchar(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS `bans` (
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `server_id` int(11) unsigned NOT NULL,
    `steamid` varchar(32) NOT NULL,
    `reason` varchar(255) NOT NULL,

    FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`) ON DELETE RESTRICT
);