/* eslint-disable */
import { Component, Vue } from "vue-property-decorator";

// You can declare mixins as the same style as components.
@Component
export class General extends Vue {
  humanized_time_span(
    date: any,
    ref_date?: any,
    date_formats?: any,
    time_units?: any
  ) {
    //Date Formats must be be ordered smallest -> largest and must end in a format with ceiling of null
    date_formats = date_formats || {
      past: [
        { ceiling: 60, text: "$seconds seconds ago" },
        { ceiling: 3600, text: "$minutes minutes ago" },
        { ceiling: 86400, text: "$hours hours ago" },
        { ceiling: 2629744, text: "$days days ago" },
        { ceiling: 31556926, text: "$months months ago" },
        { ceiling: null, text: "$years years ago" },
      ],
      future: [
        { ceiling: 60, text: "in $seconds seconds" },
        { ceiling: 3600, text: "in $minutes minutes" },
        { ceiling: 86400, text: "in $hours hours" },
        { ceiling: 2629744, text: "in $days days" },
        { ceiling: 31556926, text: "in $months months" },
        { ceiling: null, text: "in $years years" },
      ],
    };
    //Time units must be be ordered largest -> smallest
    time_units = time_units || [
      [31556926, "years"],
      [2629744, "months"],
      [86400, "days"],
      [3600, "hours"],
      [60, "minutes"],
      [1, "seconds"],
    ];

    date = new Date(date);
    ref_date = ref_date ? new Date(ref_date) : new Date();
    let seconds_difference = (ref_date - date) / 1000;

    let tense = "past";
    if (seconds_difference < 0) {
      tense = "future";
      seconds_difference = 0 - seconds_difference;
    }

    function get_format() {
      for (let i = 0; i < date_formats[tense].length; i++) {
        if (
          date_formats[tense][i].ceiling == null ||
          seconds_difference <= date_formats[tense][i].ceiling
        ) {
          return date_formats[tense][i];
        }
      }
      return null;
    }

    function get_time_breakdown() {
      let seconds = seconds_difference;
      let breakdown: any = {};
      for (let i = 0; i < time_units.length; i++) {
        let occurences_of_unit = Math.floor(seconds / time_units[i][0]);
        seconds = seconds - time_units[i][0] * occurences_of_unit;
        breakdown[time_units[i][1]] = occurences_of_unit;
      }
      return breakdown;
    }

    function render_date(date_format: any) {
      let breakdown = get_time_breakdown();
      let time_ago_text = date_format.text.replace(/\$(\w+)/g, function () {
        return breakdown[arguments[1]];
      });
      return depluralize_time_ago_text(time_ago_text, breakdown);
    }

    function depluralize_time_ago_text(time_ago_text: any, breakdown: any) {
      for (let i in breakdown) {
        if (breakdown[i] == 1) {
          let regexp = new RegExp("\\b" + i + "\\b");
          time_ago_text = time_ago_text.replace(regexp, function () {
            return arguments[0].replace(/s\b/g, "");
          });
        }
      }
      return time_ago_text;
    }

    return render_date(get_format());
  }
}
