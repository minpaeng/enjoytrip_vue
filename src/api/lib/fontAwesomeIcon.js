import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart as fasHeart, faPen, faSuitcase, faPeopleArrows, faClipboard } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faUser } from "@fortawesome/free-regular-svg-icons";
library.add(fasHeart, farHeart, faPen, faPeopleArrows, faClipboard);
library.add(faSuitcase, faUser);

Vue.component("font-awesome-icon", FontAwesomeIcon);
