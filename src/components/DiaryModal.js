// import React from "react";
// import {
//   View,
//   Modal,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";

// const DiaryModal = ({ isVisible, children, onClose }) => {
//   return (
//     <Modal animationType="fade" transparent={true} visible={isVisible}>
//       <View style={styles.modalContainer}>
//         <TouchableWithoutFeedback onPress={onClose}>
//           <View style={styles.overlay}></View>
//         </TouchableWithoutFeedback>
//         <View style={styles.modalContent}>{children}</View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   overlay: {
//     position: "absolute",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.7)",
//   },
//   modalContent: {
//     position: "relative",
//     width: "85%",
//     maxHeight: "70%",
//     borderRadius: 10,
//     overflow: "auto",
//     padding: 15,
//     flex: 1,
//   },
//   //   header: {
//   //     flexDirection: "row",
//   //     justifyContent: "flex-end",
//   //     padding: 10,
//   //   },
// });

// export default DiaryModal;
