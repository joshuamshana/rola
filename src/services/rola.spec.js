import { calu } from "./rola";

describe("RolaService", function () {
  describe("calu", function () {
    it("should fail if data is null", (done) => {
      calu(null).catch((reason) => {
        expect(reason.message).toBe("data required");
        done();
      });
    });
    it("should fail if data is undefined", (done) => {
      calu(undefined).catch((reason) => {
        expect(reason.message).toBe("data required");
        done();
      });
    });
    it("should fail if data is number", (done) => {
      calu(1).catch((reason) => {
        expect(reason.message).toBe("data required");
        done();
      });
    });
    it("should fail if data is string", (done) => {
      calu("lked").catch((reason) => {
        expect(reason.message).toBe("data required");
        done();
      });
    });
    it("should fail if data is function", (done) => {
      calu(() => {}).catch((reason) => {
        expect(reason.message).toBe("data required");
        done();
      });
    });
    it("should fail if data is empty map", (done) => {
      calu({}).catch((reason) => {
        expect(reason.message).toBe("divider must be number");
        done();
      });
    });
    it("should fail if data has no items", (done) => {
      calu({
        divider: 7
      }).catch((reason) => {
        expect(reason.message).toBe("items required");
        done();
      });
    });
    it("should fail if data items if bad formatted", (done) => {
      calu({
        divider: 7,
        items: [{}]
      }).catch((reason) => {
        expect(reason.message).toBe("name must be string in items element");
        done();
      });
    });
    // quantity must be number in items element
    it("should fail if data items if bad formatted", (done) => {
      calu({
        divider: 7,
        items: [{ name: "j" }]
      }).catch((reason) => {
        expect(reason.message).toBe("quantity must be number in items element");
        done();
      });
    });
    it("should pass if data is clean", async () => {
      const r = await calu({
        divider: 2,
        items: [{ name: "j", quantity: 10 }]
      });
      expect(r).toEqual([
        {
          name: "j",
          value: 5
        }
      ]);
    });
  });
});
