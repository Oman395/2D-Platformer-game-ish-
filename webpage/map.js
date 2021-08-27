export var map = [
    [
        /*I don't usually put this many comments, but here it is necessary as this is the bit I want to be easy to edit for regular people. Key:
        '(', ')': Top corners, left and right
        '{', '}': Bottom corners, left and right
        'T': Top facing ground
        'B': Bottom facing ground
        'L', 'R': Left and right facing ground
        'G': Ground center, not walkable surface
        ':', ';': Interior corner top, left and right
        '[', ']': Interior corner bottom, left and right
        One character is exactly the same size as the player model
        Add as many lines as you want, the blocks move with the player
        Dashes are spaces
        Farthest jump is ~9 spaces but farthest not horrible is 8
        Have fun, and mess around!*/
        '--------------------------------()',
        '----------------------()--------{}',
        '------------()--------{}',
        '--()--------{}',
        '--{}',
        //Bottom is  mostly not visible, but used as base
    ],
    [ // Extra space here for when I start working on menus and levels
        '--------------------------------------()',
        '----------------------------()--------{}',
        '--(TTTTTT)--------()--------{}',
        '--L;BBBBB}--------{}',
        '--{}',
    ]
]