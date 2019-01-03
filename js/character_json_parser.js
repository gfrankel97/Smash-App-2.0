function load_JSON(callback) {
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'https://smashappstorage.file.core.windows.net/smashappfiles/images/moves/hitboxDB.json' + '?sv=2018-03-28&ss=f&srt=co&sp=r&st=2019-01-03T04%3A22%3A55Z&se=2019-04-04T04%3A22%3A00Z&sig=%2F1i7SsE%2FAqLKuGILJUrMZMfRwPE5DhufwFxow70rQgQ%3D', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
              callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function load_JSON2(callback) {
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'https://smashappstorage.file.core.windows.net/smashappfiles/images/moves/character_general_data.json' + '?sv=2018-03-28&ss=f&srt=co&sp=r&st=2019-01-03T04%3A22%3A55Z&se=2019-04-04T04%3A22%3A00Z&sig=%2F1i7SsE%2FAqLKuGILJUrMZMfRwPE5DhufwFxow70rQgQ%3D', true);

    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
              callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function load_character_data() {
    return new Promise(function(resolve, reject) {
        load_JSON(function(response) {
            var data_obj = JSON.parse(response);
            
            var character_names = {'Zd': 'Zelda',
                                   'Sh': 'Sheik',
                                   'CF': 'Captain Falcon',
                                   'DK': 'D. K.',
                                   'DM': 'Dr. Mario',
                                   'YL': 'Young Link',
                                   'Fc': 'Falco',
                                   'Fx': 'Fox',
                                   'Bw': 'Bowser',
                                   'Lk': 'Link',
                                   'Lg': 'Luigi',
                                   'GW': 'Mr. Game and Watch',
                                   'Ry': 'Roy',
                                   'Sm': 'Samus Aran',
                                   'Gn': 'Ganondorf',
                                   'Ns': 'Ness',
                                   'Mw': 'Mewtwo',
                                   'Ys': 'Yoshi',
                                   'Kb': 'Kirby',
                                   'Jp': 'Jigglypuff',
                                   'Pc': 'Peach',
                                   'Pi': 'Pichu',
                                   'Pk': 'Pikachu',
                                   'Ma': 'Mario',
                                   'Po': 'Ice Climbers',
                                   'Ms': 'Marth'
                };
            var unknowns = [];
            
            var data_name_keys = Object.keys(data_obj);
            var character_name_keys = Object.keys(character_names);
            
            for(var i=0; i < data_name_keys.length; i++) {
                 for(var y=0; y < character_name_keys.length; y++) {
                     if(data_name_keys[i] == character_name_keys[y]) {
                         data_obj[character_name_keys[y]].name = character_names[data_name_keys[i]];
                         break;
                     }
                     else if((character_name_keys.length - 1) == y) {
                         unknowns.push(data_name_keys[i]);
                     }
                 }
            }
            load_JSON2(function(response) {
                var new_data_obj = JSON.parse(response);
                var unfinished_product = [];
                for(var i=0; i < Object.keys(new_data_obj).length; i++) {
                    delete new_data_obj[Object.keys(new_data_obj)[i]].index;
                    delete new_data_obj[Object.keys(new_data_obj)[i]]['Learning Curve'];
                    
                    
                    for(var y=0; y < Object.keys(data_obj).length; y++) {
                        if(convert_to_filename(data_obj[Object.keys(data_obj)[y]].name) == convert_to_filename(Object.keys(new_data_obj)[i])) { //DATA MISMATCH CAUSES MISSING CHARATERS
                            new_data_obj[Object.keys(new_data_obj)[i]].name = convert_to_filename(Object.keys(new_data_obj)[i]);
                            var combined = get_final_product(data_obj[Object.keys(data_obj)[y]], new_data_obj[Object.keys(new_data_obj)[i]])
                            unfinished_product.push(combined);
                        }
                    }
                }
                resolve(unfinished_product);
            })
        });
    });
}

function get_final_product(data_obj_1, data_obj_2) {
        data_obj_2.moves = [];
        for(var key in data_obj_1) {
            if(typeof data_obj_1[key] == 'object') {
                data_obj_2.moves.push({});
                data_obj_2.moves[data_obj_2.moves.length - 1].hitboxes = data_obj_1[key];
                data_obj_2.moves[data_obj_2.moves.length - 1].active = true;
                data_obj_2.moves[data_obj_2.moves.length - 1].name = get_display_name(key);
                data_obj_2.moves[data_obj_2.moves.length - 1].input = get_input(key);
                if(data_obj_2.moves[data_obj_2.moves.length - 1].name.charAt(data_obj_2.moves[data_obj_2.moves.length - 1].name.length - 1) == 'B') {
                    if('b_moves' in data_obj_2) {
                    }
                    var index_to_display_name = {'Neutral B': 0,
                                                 'Side B': 1,
                                                 'Up B': 2,
                                                 'Down B': 3
                        }
                }
            }
        }
        delete data_obj_2.moves.name;
        return data_obj_2;
}

function get_display_name(input) {
    var input_to_display_name = {
        'dthrow': 'Down Throw',
        'uthrow': 'Up Throw',
        'bthrow': 'Back Throw',
        'fthrow' : 'Forward Throw',
        'pummel': 'Pummel',
        'edge': 'Edge',
        'floor': 'Floor',
        'dair': 'Down Air',
        'uair': 'Up Air',
        'bair': 'Back Air',
        'fair': 'Forward Air',
        'nair': 'Neutral Air',
        'dsmash': 'Down Smash',
        'usmash': 'Up Smash',
        'fsmash': 'Forward Smash',
        'dtilt': 'Down Tilt',
        'utilt': 'Up Tilt',
        'ftilt': 'Forward Tilt',
        'dash': 'Dash Attack',
        'downSpecial': 'Down B',
        'upSpecial': 'Up B',
        'sideSpecial': 'Forward B',
        'neutralSpecial': 'Neutral B',
        'taunt': 'Taunt'
    }
    return input in input_to_display_name ? input_to_display_name[input] : 'NO DISPLAY NAME';
}

function get_input(name) {
    var name_to_controller_input = {
        'dthrow': ['z + control_down'],
        'uthrow': ['z + control_up'],
        'bthrow': ['z', 'control_left', 'z', 'control_right'],
        'fthrow' : ['z', 'control_left', 'z', 'control_right'],
        'pummel': ['z', 'a'],
//        'edge': 'Edge',
//        'floor': 'Floor',
        'dair': ['cstick_down'],
        'uair': ['cstick_up'],
        'bair': ['cstick_left', 'cstick_right'],
        'fair': ['cstick_left', 'cstick_right'],
        'nair': ['a'],
        'dsmash': ['control_down + a', 'cstick_down'],
        'usmash': ['control_up + a', 'cstick_up'],
        'fsmash': ['control_right + a', 'cstick_right', 'control_left + a', 'cstick_left'],
        'dtilt': ['control_down + a'],
        'utilt': ['control_up + a'],
        'ftilt': ['control_right + a', 'control_left + a'],
        'dash': ['a'],
        'downSpecial': ['control_down + b'],
        'upSpecial': ['control_up + b'],
        'sideSpecial': ['control_right + b', 'control_left + b'],
        'neutralSpecial': ['b'],
//        'taunt': 'Taunt'
    }
    return name in name_to_controller_input ? name_to_controller_input[name] : 'NO INPUTS';
}

function convert_to_filename(name) {
    if(name) {
        if(name == ('D. K.' || 'DK')) {
            name == 'Donkey Kong';
        }
        if(name == ('Samus Aran' || 'Sm')) {
            name == 'Samus';
        }
        name = name.replace(' ', '_');
        name = name.replace(' ', '_');
        name = name.replace('.', '');
        name = name.replace('.', '');
        name = name.toLowerCase();
        return name;
    }
    
}