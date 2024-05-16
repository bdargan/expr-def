import { describe, it } from "node:test";
import assert from 'node:assert';

import { ApplyEvaluator, Dictionary, getValueFromKey, getValueFromKeyOrValue } from "./apply-evaluator";
import { ExpressionDef, Value } from "./model";

describe("applyEvaluator", () => {
  describe("getValueFromKey", () => {
    it("should return value from key", () => {
      const data: Dictionary<Dictionary<Value | Value[]>> = {
        user: {
          id: 'rick'
        }
      }
      assert.equal(getValueFromKey("user", data), data.user.id)
    });
  })
  describe("getValueFromKeyOrValue", () => {
    it("should return value from key ref", () => {
      const data: Dictionary<Dictionary<Value | Value[]>> = {
        user: {
          id: 'rick'
        },
        file: {
          owner_id: 'rick'
        }
      }
      //{ref: "user.id", type: "field"}
      assert.equal(getValueFromKeyOrValue({ref: "file.owner", type: 'field'}, data), data.user.id)
    });
    it("should return value from file key", () => {
      const data: Dictionary<Dictionary<Value | Value[]>> = {
        user: {
          id: 'rick'
        },
        file: {
          owner_id: 'rick'
        }
      }
      //{ref: "user.id", type: "field"}
      assert.equal(getValueFromKeyOrValue("file.owner", data), data.user.id)
    });
  })
  describe('isBinaryExpr', () => {
    it('should evaluate expression', () => {
      const expr: ExpressionDef = ['1', '=', '1']
      assert.equal(ApplyEvaluator.evaluate(expr, {}), true)
    })
    // it('should evaluate missing expression', () => {
    //   const expr: ExpressionDef = ['user', '<>', null]
    //   assert.equal(ApplyEvaluator.evaluate(expr, { user: { id: undefined } }), false)
    // })
    it('should evaluate undefined field <> "null"', () => {
      const expr: ExpressionDef = ['f.undef', '<>', 'null']
      assert.equal(ApplyEvaluator.evaluate(expr, { f: {} }), false)
    })
    it('should evaluate equality expression with data value', () => {
      const expr: ExpressionDef = ['user', '=', 'rick']
      const data: Dictionary<Dictionary<Value | Value[]>> = {
        user: {
          id: 'morty'
        }
      }
      const actual = ApplyEvaluator.evaluate(expr, data)
      assert.equal(actual, false)
    })
    it('should evaluate equality expression with unequal data value', () => {
      const expr: ExpressionDef = ['user', '=', 'rick']
      const data: Dictionary<Dictionary<Value | Value[]>> = {
        user: {
          id: 'morty'
        }
      }
      const actual = ApplyEvaluator.evaluate(expr, data)
      assert.equal(actual, false)
    })
  })
})