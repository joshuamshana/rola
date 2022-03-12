import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  ListView,
  FlatList
} from "react-native";
import TopBar from "../components/TopBar";
import { ReactComponent as RemoveIcon } from "../raw/rr.svg";
import { calu } from "../services/rola";
import { ReactComponent as BackIcon } from "../raw/back.svg";

function calculateButtonTextStyle() {
  return {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 1.5,
    color: "#FFFFFF"
  };
}

function calculateButtonStyle() {
  return {
    maxWidth: 298,
    width: "100%",
    height: 35,
    background: "#18AF55",
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16
  };
}

function dividerTextStyle() {
  return {
    fontWeight: 300,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 1.5,
    color: "#000000",
    marginTop: 8
  };
}

function inputStyle() {
  return {
    height: 37,
    background: "#FCFCFC",
    border: "1px solid #18AF55",
    boxSizing: "border-box",
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: 4
  };
}

function removeIconStyle() {
  return {
    width: 39,
    height: 37,
    background: "#FCFCFC",
    border: "1px solid #FF0000",
    boxSizing: "border-box",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginLeft: 4
  };
}

function formContainerStyle() {
  return {
    paddingTop: 16,
    width: "90%",
    maxWidth: 400,
    marginBottom: 50
  };
}

function dividerLineStyle() {
  return {
    width: "100%",
    height: 0,
    border: "1px solid #B8B8B8",
    marginTop: 8
  };
}

function AddItemButton({ addItem }) {
  return (
    <Pressable
      style={{
        paddingTop: 5,
        paddingBottom: 5
      }}
      onPress={() => {
        addItem({
          name: "",
          quantity: 0
        });
      }}
    >
      <Text
        style={{
          fontWeight: 400,
          fontSize: 16,
          lineHeight: 19,
          letterSpacing: 1.5,
          color: "#2B3EEF"
        }}
      >
        ADD ITEM
      </Text>
    </Pressable>
  );
}

function DividerInput({ divider, setDivider }) {
  return (
    <View>
      <Text style={dividerTextStyle()}>Divider</Text>
      <TextInput
        value={divider}
        onChangeText={setDivider}
        placeholder={"Value"}
        style={inputStyle()}
        keyboardType={"numeric"}
      />
    </View>
  );
}

function ItemsArray({ item, index, removeItem, updateItem }) {
  return (
    <View style={{ marginTop: 5 }}>
      <TextInput
        value={item.name}
        onChangeText={(t1) => {
          item.name = t1;
          updateItem(index, { ...item });
        }}
        placeholder={"Name"}
        style={inputStyle()}
      />
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          display: "flex",
          flexWrap: "nowrap"
        }}
      >
        <TextInput
          value={item.quantity}
          onChangeText={(t2) => {
            item.quantity = Number(t2);
            updateItem(index, { ...item });
          }}
          style={{
            flexGrow: 1,
            width: 0,
            ...inputStyle()
          }}
          keyboardType={"numeric"}
          placeholder={"Quantity"}
        />
        <Pressable
          onPress={() => {
            removeItem(index);
          }}
          style={removeIconStyle(0)}
        >
          <RemoveIcon />
        </Pressable>
      </View>
      <View style={dividerLineStyle()} />
    </View>
  );
}

function CalculateButton({ onPress, total }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Pressable onPress={onPress} style={calculateButtonStyle()}>
        <Text style={calculateButtonTextStyle()}>CALCULATE [{total}]</Text>
      </Pressable>
    </View>
  );
}

function RolaCalu() {
  const [report, setReport] = useState([]);
  const [divider, setDivider] = useState(0);
  const [items, setItems] = useState([]);
  return (
    <View
      style={{
        backgroundColor: "transparent",
        height: "100vh"
      }}
    >
      <TopBar title={"ROLLER"} />
      <ScrollView
        style={{
          flex: 1
        }}
        contentContainerStyle={{
          alignItems: "center"
        }}
      >
        <View style={formContainerStyle()}>
          <DividerInput divider={divider} setDivider={setDivider} />
          {items.length > 0 ? (
            <Text style={dividerTextStyle()}>Items</Text>
          ) : null}

          {items.map((it) => (
            <ItemsArray
              key={items.indexOf(it)}
              index={items.indexOf(it)}
              updateItem={(i, y) => {
                items[i] = y;
                setItems([...items]);
              }}
              removeItem={(k) => {
                items.splice(k, 1);
                setItems([...items]);
              }}
              item={it}
            />
          ))}
          <AddItemButton
            addItem={(v) => {
              setItems([...items, v]);
            }}
          />
          {items.length > 0 ? (
            <CalculateButton
              total={items.length}
              onPress={() => {
                calu({
                  divider: Number(divider),
                  items: items
                })
                  .then((r) => {
                    setReport(r);
                  })
                  .catch(console.log);
              }}
            />
          ) : null}
        </View>
      </ScrollView>
      <Modal
        onRequestClose={() => {
          setReport([]);
        }}
        visible={report.length > 0}
      >
        <TopBar
          back={<BackIcon />}
          onBack={() => {
            setReport([]);
          }}
          title={"Report"}
        />
        <FlatList
          style={{ marginTop: 5 }}
          data={report}
          renderItem={(it) => (
            <View
              style={{
                paddingLeft: 16,
                paddingRight: 16
              }}
              key={it.key}
            >
              <Text
                style={{
                  fontWeight: 200,
                  fontSize: 14,
                  lineHeight: 17,
                  letterSpacing: 1.5,
                  color: "#000000"
                }}
              >
                {it.item.name}
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 16,
                  lineHeight: 19,
                  letterSpacing: 1.5,
                  color: "#000000",
                  paddingTop: 8,
                  paddingBottom: 8
                }}
              >
                {it.item.value}
              </Text>
              <View
                style={{
                  border: "1px solid #B8B8B8",
                  height: 0,
                  width: "100%"
                }}
              />
            </View>
          )}
        />
      </Modal>
    </View>
  );
}

export default RolaCalu;
