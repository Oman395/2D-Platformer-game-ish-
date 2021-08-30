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
        'S': Start position
        One character is exactly the same size as the player model
        Add as many lines as you want, the blocks move with the player
        Dashes are spaces
        Farthest jump is ~9 spaces but farthest not horrible is 8
        Currently working on a start pos but it's uh... not fun
        Have fun, and mess around!*/
        '--------------------------------()',
        '----------------------()--------{}',
        '--S---------()--------{}---------',
        '--()--------{}',
        '--{}'//Bottom is  mostly not visible, but used as base
    ],
    [ // Extra space here for when I start working on menus and levels
        '------------------------------------------------()',
        '--------------------------------------()--------{}', // This jump length is about the max you can jump with no x error, might want to move further for going back down.
        '--S-------------------------()--------{}',
        '--(TTTTTT)--------()--------{}',
        '--L;BBBBB}--------{}',
        '--{}',
    ]
]