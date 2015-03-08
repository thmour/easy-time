(function() {
	var temp;
	var elem = document.getElementById('easy-time');
	var opts = !elem ? {} : {
		table: (temp = elem.getAttribute('table')) || temp.split(' '),
		singular: elem.getAttribute('singular') === 'true'
	};
	
	var ctable = [1000, 60, 60, 24, 365 / 12, 12];
	var ntable = opts.table || ['milliseconds', 'seconds', 'minutes', 'hours', 'days', 'months', 'years'];

	var convert_table = [], temp_arr;

	for(var i = 0; i < ntable.length; i++) {
		temp_arr = [];
		temp_arr[i] = 1;

		for (var j = i + 1; j < ntable.length; j++) {
			temp_arr[j] = temp_arr[j-1] / ctable[j-1];
		}
		for (var j = i - 1; j >= 0; j--) {
			temp_arr[j] = temp_arr[j+1] * ctable[j];
		}
		convert_table.push(temp_arr);
		(function (unit) {
			this[ntable[i]] = function(number) {
				var result = new Number(number);
				result.__unit = unit;
				return result;
			}
			
			if (opts.singular === true) {
				this[ntable[i]] = function(number) {
					var result = new Number(number);
					result.__unit = unit;
					return result;
				}
			}

			this['to_' + ntable[i]] = function(number) {
				var result = new Number(number * convert_table[number.__unit || 0][unit]);
				result.__unit = unit;
				return result;
			}
		})(i);
	}
}).call(this);