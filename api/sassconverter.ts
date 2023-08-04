
import * as sass from 'sass';
//import * as sass from 'https://jspm.dev/sass';
//import 'package:sass/sass.dart' as sass;
//import * as sass from 'sass/sass.dart';

const SassConverter = async (scssString: string ) => {
    console.log(sass)
    return sass.compileString(scssString, "sync");
};

export default SassConverter;