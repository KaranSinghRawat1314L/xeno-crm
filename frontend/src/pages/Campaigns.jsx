import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Campaigns() {
  const [name, setName] = useState("");
  const [rules, setRules] = useState([{ field: "totalSpend", operator: ">", value: 10000, logic: "AND" }]);
  const [audience, setAudience] = useState(null);
  const [aiMessage, setAiMessage] = useState("");
  const [message, setMessage] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [logs, setLogs] = useState([]);

  const handleRuleChange = (index, key, value) => {
    const newRules = [...rules];
    newRules[index][key] = value;
    setRules(newRules);
  };

  const addRule = () => setRules([...rules, { field: "visitCount", operator: "<", value: 3, logic: "AND" }]);
  const removeRule = (i) => setRules(rules.filter((_, idx) => idx !== i));

  const previewAudience = async () => {
    const res = await axios.post("http://localhost:5000/api/campaigns/preview", { rules }, { withCredentials: true });
    setAudience(res.data.audienceSize);
  };

  const suggestMessage = async () => {
    const res = await axios.post("https://xeno-crm-xd8e.vercel.app/api/ai/message", { objective: name }, { withCredentials: true });
    setAiMessage(res.data.suggestion);
  };

  const createCampaign = async () => {
    await axios.post("http://localhost:5000/api/campaigns", {
      name,
      rules,
      createdBy: "admin@example.com",
      message: aiMessage || message
    }, { withCredentials: true });
    setName("");
    setRules([{ field: "totalSpend", operator: ">", value: 10000, logic: "AND" }]);
    setMessage("");
    setAiMessage("");
    setAudience(null);
    loadCampaigns();
  };

  const loadCampaigns = async () => {
    const res = await axios.get("http://localhost:5000/api/campaigns", { withCredentials: true });
    setCampaigns(res.data.campaigns);
    setLogs(res.data.logs);
  };

  const getDeliveryStats = (campaignId) => {
    const related = logs.filter(l => l.campaignId === campaignId);
    const sent = related.filter(l => l.status === "SENT").length;
    const failed = related.filter(l => l.status === "FAILED").length;
    const pending = related.filter(l => l.status === "PENDING").length;
    return { sent, failed, pending };
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-slate-800 border-b border-slate-200 pb-2">Create Campaign</h2>
      <div className="bg-white rounded-lg shadow p-6 border border-slate-200 mb-8 max-w-xl">
        {rules.map((rule, i) => (
          <div key={i} className="flex items-center mb-2">
            <select value={rule.logic} onChange={e => handleRuleChange(i, "logic", e.target.value)} className="border-2 border-gray-600 text-black p-1 mr-2 rounded">
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
            <select value={rule.field} onChange={e => handleRuleChange(i, "field", e.target.value)} className="border-2 border-gray-600 text-black p-1 mr-2 rounded">
              <option value="totalSpend">Total Spend</option>
              <option value="visitCount">Visit Count</option>
              <option value="lastOrderDate">Last Order Date</option>
            </select>
            <select value={rule.operator} onChange={e => handleRuleChange(i, "operator", e.target.value)} className="border-2 border-gray-600 text-black p-1 mr-2 rounded">
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value="==">==</option>
            </select>
            <input type="text" value={rule.value} onChange={e => handleRuleChange(i, "value", e.target.value)} className="border-2 border-gray-600 text-black p-1 mr-2 w-24 rounded" />
            <button onClick={() => removeRule(i)} className="text-red-500">Remove</button>
          </div>
        ))}
        <button onClick={addRule} className="text-blue-500">+ Add Rule</button>
        <button onClick={previewAudience} className="ml-4 bg-slate-200 px-3 py-1 rounded">Preview Audience</button>
        {audience !== null && <span className="ml-4 text-slate-700">Audience Size: {audience}</span>}
        <div className="mt-4">
          <input className="border-2 border-gray-600 text-black p-2 w-full mb-2 rounded" placeholder="Campaign Name" value={name} onChange={e => setName(e.target.value)} />
          <textarea className="border-2 border-gray-600 text-black p-2 w-full mb-2 rounded" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
          <button onClick={suggestMessage} className="bg-blue-500 text-white px-3 py-1 rounded">AI Suggest Message</button>
          {aiMessage && <div className="mt-2 p-2 bg-slate-100 text-blacks rounded">{aiMessage}</div>}
        </div>
        <button onClick={createCampaign} className="bg-green-600 text-white px-4 py-2 rounded mt-4 float-right">Create Campaign</button>
        <div className="clear-both"></div>
      </div>
      <h3 className="text-lg font-semibold mb-2 text-slate-700">Campaign History</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campaigns.map(c => {
          const { sent, failed, pending } = getDeliveryStats(c._id);
          return (
            <div key={c._id} className="bg-white rounded-lg shadow p-4 border border-slate-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg text-slate-800">{c.name}</div>
                  <div className="text-xs text-slate-500">{new Date(c.createdAt).toLocaleString()}</div>
                </div>
                <div>
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs mr-2">
                    Sent: {sent}
                  </span>
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs mr-2">
                    Failed: {failed}
                  </span>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs">
                    Pending: {pending}
                  </span>
                </div>
              </div>
              <div className="mt-2 text-sm text-slate-600">
                Rules: {c.rules.map(r => `${r.logic} ${r.field} ${r.operator} ${r.value}`).join(", ")}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
