import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const ArchangelsModal = ({ isVisible, children, onClose }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlay}></View>
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <View style={styles.contentContainer}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    position: "relative",
    width: "95%",
    maxHeight: "70%",
    borderRadius: 10,
    overflow: "auto",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  contentContainer: {
    padding: 20,
  },
});

export default ArchangelsModal;
