"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _CMC_column = _interopRequireDefault(require("content/CMC_column"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(props) {
  console.log(props); // const {
  //     photosListPhotos,
  //     user,
  //     getNextPageListPhotos,
  // } = props;

  return null; // const [currentScroll, setCurrentScroll] = useState(0);
  // const movedArea = document.body.scrollHeight - document.body.clientHeight;
  // useEffect(() => {
  //     window.onscroll = () => {
  //         setCurrentScroll(window.pageYOffset)
  //     }
  // }, [window.pageYOffset]);
  // const heightMin = Math.min(photosListPhotos.sorted[0].height, photosListPhotos.sorted[1].height, photosListPhotos.sorted[2].height);
  // useEffect(() => {
  //     if (
  //         user.isLoggedIn &&
  //         !photosListPhotos.state &&
  //         (
  //             heightMin == 0 ||
  //             heightMin != 0 && movedArea - currentScroll * 4 / 3 < 0
  //         )
  //     ) getNextPageListPhotos(user, photosListPhotos);
  // });
  // let codeListPhotos = null;
  // if (user.isLoggedIn) {
  //     codeListPhotos = (
  //         <>
  //             <HomeColumn {...photosListPhotos.sorted[0]} />
  //             <HomeColumn {...photosListPhotos.sorted[1]} />
  //             <HomeColumn {...photosListPhotos.sorted[2]} />
  //         </>
  //     )
  // }
  // return (
  //     <div className="content-plug">
  //         <div className="content-base">
  //             {codeListPhotos}
  //         </div>
  //     </div>
  // )
};

exports["default"] = _default;