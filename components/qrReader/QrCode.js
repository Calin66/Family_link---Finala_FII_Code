import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";

function QrCode({ kid }) {
  return <QRCode size={200} value={kid} />;
}

const styles = StyleSheet.create({
  container: {},
});

export default QrCode;
