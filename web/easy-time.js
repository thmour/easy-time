(function() {
	var temp;
	var elem = document.currentScript || (function() {
      var scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();
	var opts = !elem ? {} : {
		table: (temp = elem.getAttribute('table')) && temp.split(' '),
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
			try {
				Object.defineProperty(this.Number.prototype, ntable[i], {
					get : function() {
						this.__unit = unit;
						return this;
					}
				});
			} catch (error) {
				/*Ignore, must be redefine property error*/
			}

			if (opts.singular === true) {
				try {
					Object.defineProperty(this.Number.prototype, ntable[i].slice(0, -1), {
						get : function() {
							this.__unit = unit;
							return this;
						}
					});
				} catch (error) {
					/*Ignore, must be redefine property error*/
				}
			}
			
			try {
				Object.defineProperty(this.Number.prototype, 'to_' + ntable[i], {
					get : function() {
						var result = new Number(this * convert_table[this.__unit || 0][unit]);
						result.__unit = unit;
						return result;
					}
				});
			} catch (error) {
				/*Ignore, must be redefine property error*/
			}
		})(i)
	}
}).call(this);