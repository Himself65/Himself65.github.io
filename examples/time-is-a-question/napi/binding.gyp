{
  "targets": [
    {
      "target_name": "binding",
      "sources": [ "src/binding.cc" ],
      'include_dirs': [
        "<!@(node -p \"require('node-addon-api').include\")"
      ]
    }
  ]
}
