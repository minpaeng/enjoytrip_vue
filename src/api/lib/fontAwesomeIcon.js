import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart as fasHeart, faPen as faPen, faSuitcase as faSuitcase } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faUser as faUser } from "@fortawesome/free-regular-svg-icons";
library.add(fasHeart, farHeart, faPen);
library.add(faSuitcase, faUser);

Vue.component("font-awesome-icon", FontAwesomeIcon);
