"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactForm = void 0;
const react_1 = __importDefault(require("react"));
const useEmail_1 = require("../../hooks/useEmail");
const react_i18next_1 = require("react-i18next");
const ContactForm = () => {
    const { t } = (0, react_i18next_1.useTranslation)();
    const { sendEmail, isLoading, error, success } = (0, useEmail_1.useEmail)();
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        yield sendEmail({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        });
    });
    return (react_1.default.createElement("form", { onSubmit: handleSubmit, className: "space-y-4" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700" }, t('contact.form.name')),
            react_1.default.createElement("input", { type: "text", id: "name", name: "name", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" })),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "email", className: "block text-sm font-medium text-gray-700" }, t('contact.form.email')),
            react_1.default.createElement("input", { type: "email", id: "email", name: "email", required: true, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" })),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "message", className: "block text-sm font-medium text-gray-700" }, t('contact.form.message')),
            react_1.default.createElement("textarea", { id: "message", name: "message", rows: 4, className: "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" })),
        error && (react_1.default.createElement("div", { className: "text-red-600 bg-red-50 p-3 rounded-md", role: "alert" }, error)),
        success && (react_1.default.createElement("div", { className: "text-green-600 bg-green-50 p-3 rounded-md", role: "alert" }, t('contact.form.success'))),
        react_1.default.createElement("button", { type: "submit", disabled: isLoading, className: `w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}` }, isLoading ? (react_1.default.createElement("span", { className: "flex items-center" },
            react_1.default.createElement("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" },
                react_1.default.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                react_1.default.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" })),
            t('contact.form.sending'))) : (t('contact.form.submit')))));
};
exports.ContactForm = ContactForm;
