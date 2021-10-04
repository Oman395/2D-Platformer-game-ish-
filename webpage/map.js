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
        '$', '%': Interior corner double, left and right
        'S': Start position
        'X': Boundary block, player teleps to the bottom of the world and dies instantly, make sure no blocks in view!
        'E' Enemy, jump on the head to kill- but watch out for the sides!
        'F' Finish flag!
        One character is exactly the same size as the player model
        Add as many lines as you want, the blocks move with the player
        Dashes are spaces
        Farthest jump is ~9 spaces but farthest not horrible is 8
        Currently working on a start pos but it's uh... not fun
        Each map contained within brackets is a map, 1 through 9
        Have fun, and mess around!*/
        'S',
        '(TTT)',
        '{BBB}',
        '',
        '',
        '-----()',
        '-----{}',
        '',
        '--()',
        '--{}-------------XXXXXXXXXXXXXXXXXXXXXXXXX', // Ten blocks to the side is a minimum to keep blocks out of sight',
        '',
        '-----()',
        '-----{}',
        '-------------------------------------------------------F',
        '--()-----------------------------------------()-------()',
        '--{}----------------------------------()-----LR---E---LR',
        '-------------------------------------($}-----L]TTTTTTT[R',
        '-----()-----------------------------($}------{BBBBBBBBB}',
        '-----LR----------------------------($}',
        '-----L]T)-------------------------($}', // FUN FACT: Each block you go up, adds another block of jump range!
        '-----{BB}------------------------($}',
        '--------------------------------($}',
        '-------------------------------([}',
        '--------------()------(TTTTTTTT$}',
        '--------------{}------{BBBBBBBB}',
    ],
    [ // This is a placeholder for when I start making actual maps lol
        '-------------------------------------------------F',
        '------------------------------------------------()',
        '--------------------------------------()--------{}',
        '--S-------------------------()--------{}',
        '--(TTTTTT)--------()--------{}',
        '--L;BBBBB}--------{}',
        '--{}',
    ],
    [ // This is a placeholder for when I start making actual maps lol
        '------------------------------------------------()',
        '--------------------------------------()--------{}',
        '--S-------------------------()--------{}',
        '--(TTTTTT)--------()--------{}',
        '--L;BBBBB}--------{}',
        '--{}',
    ],
    [ // This is a placeholder for when I start making actual maps lol
        '------------------------------------------------()',
        '--------------------------------------()--------{}',
        '--S-------------------------()--------{}',
        '--(TTTTTT)--------()--------{}',
        '--L;BBBBB}--------{}',
        '--{}',
    ],
    [ // This is a placeholder for when I start making actual maps lol
        '------------------------------------------------()',
        '--------------------------------------()--------{}',
        '--S-------------------------()--------{}',
        '--(TTTTTT)--------()--------{}',
        '--L;BBBBB}--------{}',
        '--{}',
    ],
    [ // This is a placeholder for when I start making actual maps lol
        '------------------------------------------------()',
        '--------------------------------------()--------{}',
        '--S-------------------------()--------{}',
        '--(TTTTTT)--------()--------{}',
        '--L;BBBBB}--------{}',
        '--{}',
    ],
    [ // This is a placeholder for when I start making actual maps lol
        '------------------------------------------------()',
        '--------------------------------------()--------{}',
        '--S-------------------------()--------{}',
        '--(TTTTTT)--------()--------{}',
        '--L;BBBBB}--------{}',
        '--{}',
    ],
    [ // This is a placeholder for when I start making actual maps lol
        '------------------------------------------------()',
        '--------------------------------------()--------{}',
        '--S-------------------------()--------{}',
        '--(TTTTTT)--------()--------{}',
        '--L;BBBBB}--------{}',
        '--{}',
    ],
    [ // This is a placeholder for when I start making actual maps lol
        '------------------------------------------------()',
        '--------------------------------------()--------{}',
        '--S-------------------------()--------{}',
        '--(TTTTTT)--------()--------{}',
        '--L;BBBBB}--------{}',
        '--{}',
    ],
]